import Activity from '@modules/activity/infra/typeorm/entities/Activity';

export interface IReport {
    id: string;
    report: string;
    activity: Activity;
    created_at: Date;
    updated_at: Date;
}

export interface IReportCreate {
    report: string;
    activity: Activity;
}
