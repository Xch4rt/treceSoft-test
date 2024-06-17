export interface IPasswordResetRepository {
    savePasswordResetToken(userId: number, resetToken: string) : Promise<any>;
}