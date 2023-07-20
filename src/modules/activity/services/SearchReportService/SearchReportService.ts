import { IReport } from '@modules/activity/domain/models/IReport';
import { IReportRepository } from '@modules/activity/domain/repository/IReportRepository';
import { subMonths, startOfMonth } from 'date-fns';

export class SearchReportService {
    constructor(private reportRepository: IReportRepository) {}

    public async execute(month: number, projectId: string): Promise<IReport[]> {
        let searchDate = new Date();
        searchDate = subMonths(startOfMonth(searchDate), month);

        return await this.reportRepository.findByReportDate(
            projectId,
            searchDate,
        );
    }
}
