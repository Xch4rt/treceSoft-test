import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RecoverPasswordCommand } from "../commands/recover-password";
import { Inject, NotFoundException } from '@nestjs/common'