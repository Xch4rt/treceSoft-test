export interface IPasswordResetRepository {
    savePasswordResetToken(userId: number, resetToken: string) : Promise<any>;
    resetPassword(password: string, token: string) : Promise<any>;
}