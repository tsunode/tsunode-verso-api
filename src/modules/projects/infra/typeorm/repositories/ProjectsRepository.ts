import { ICreateProjectDTO } from './../../../dtos/ICreateQuestionDTO';
import { Brackets, getRepository, ObjectLiteral, Repository } from 'typeorm';

import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';
import { IFindByIdProjectDTO } from '../../../dtos/IFindByIdProjectDTO';
import { IFindAllProjectsDTO } from '../../../dtos/IFindAllQuestionsDTO';
import { Project } from '../entities/Project';

class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public create(data: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create(data);

    return this.save(project);
  }

  public save(project: Project): Promise<Project> {
    return this.ormRepository.save(project);
  }

  public async findAll({
    page = 1,
    pageSize = 5,
    relations = [],
    filters,
  }: IFindAllProjectsDTO): Promise<Project[]> {
    const { q } = filters;

    let join;
    let where;

    if (q) {
      where = (qb: ObjectLiteral) => {
          qb.where(
            new Brackets(sqb => {
              sqb.where('description ilike :q', { q: `%${q}%` });
              sqb.orWhere('Project.title ilike :q', { q: `%${q}%` });
            }),
          );

      };
    } else {
      where = Object.keys(filters).reduce((prev, current) => {
        return filters[current] || filters[current] === 0
          ? { ...prev, [current]: filters[current] }
          : prev;
      }, {});
    }

    const projects = this.ormRepository.find({
      join,
      where,
      relations,
      take: pageSize,
      skip: pageSize * (page - 1),
      order: { createdAt: 'DESC' },
    });

    return projects;
  }

  public async findById({
    id,
    relations = [],
  }: IFindByIdProjectDTO): Promise<Project | undefined> {
    const project = this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return project;
  }

  public async delete(projectToDelete: Project): Promise<boolean> {
    const project = await this.ormRepository.remove(projectToDelete);

    return !!project;
  }
}

export { ProjectsRepository };
