import { ICreateProjectDTO } from './../dtos/ICreateQuestionDTO';
import { IFindAllProjectsDTO } from '../dtos/IFindAllQuestionsDTO';
import { Project } from '../infra/typeorm/entities/Project';
import { IFindByIdProjectDTO } from '../dtos/IFindByIdProjectDTO';

export interface IProjectsRepository {
  create(data: ICreateProjectDTO): Promise<Project>;
  save(project: Project): Promise<Project>;
  findAll(filters: IFindAllProjectsDTO): Promise<Project[]>;
  findById(filters: IFindByIdProjectDTO): Promise<Project | undefined>;
  delete(data: Project): Promise<boolean>;
}
