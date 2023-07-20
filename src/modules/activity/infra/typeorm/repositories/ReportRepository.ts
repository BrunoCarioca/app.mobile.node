import {
    IReport,
    IReportCreate,
} from '@modules/activity/domain/models/IReport';
import { IReportRepository } from '@modules/activity/domain/repository/IReportRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import Report from '../entities/Report';

export class ReportRepository implements IReportRepository {
    private ormRepository: Repository<Report>;

    constructor() {
        this.ormRepository = dataSource.getRepository(Report);
    }

    public async create({ report, activity }: IReportCreate): Promise<void> {
        const newReport = await this.ormRepository.create({
            report,
            activity,
        });

        await this.ormRepository.save(newReport);
    }

    public async save(report: IReport): Promise<void> {
        await this.ormRepository.save(report);
    }

    public async delete(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    }

    public async findByActivityId(activityId: number): Promise<IReport | null> {
        const report = await this.ormRepository.findOne({
            relations: ['activity'],
            where: {
                activity: {
                    id: activityId,
                },
            },
        });

        return report;
    }

    public async findByReportDate(
        projectId: string,
        searchDate: Date,
    ): Promise<IReport[]> {
        console.log(projectId, searchDate);
        const reports = this.ormRepository.find({
            where: {
                activity: {
                    project: {
                        id: projectId,
                    },
                    status: true,
                },
                created_at: MoreThanOrEqual(searchDate),
            },
        });

        return reports;
    }
}
