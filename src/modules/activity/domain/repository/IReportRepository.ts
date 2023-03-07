import { IReport, IReportCreate } from '../models/IReport';

export interface IReportRepository {
    findByActivityId(activityId: number): Promise<IReport | null>;
    create({ report, activity }: IReportCreate): Promise<void>;
    delete(id: string): Promise<void>;
    save(report: IReport): Promise<void>;
}
