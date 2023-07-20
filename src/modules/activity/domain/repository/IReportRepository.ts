import { IReport, IReportCreate } from '../models/IReport';

export interface IReportRepository {
    findByActivityId(activityId: number): Promise<IReport | null>;
    findByReportDate(projectId: string, searchDate: Date): Promise<IReport[]>;
    create({ report, activity }: IReportCreate): Promise<void>;
    delete(id: string): Promise<void>;
    save(report: IReport): Promise<void>;
}
