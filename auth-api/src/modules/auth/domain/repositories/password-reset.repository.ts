export interface IPasswordResetRepository {
    savePasswordResetToken(userId: number, resetToken: string) : Promise<any>;
    resetPassword(userId: number, password: string, token: string) : Promise<any>;
}