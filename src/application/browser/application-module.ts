
import { ContainerModule } from "inversify"

import { SelectionService } from '../common/selection-service'
import { CommonCommandContribution, CommonMenuContribution } from '../common/commands-common'
import { TheiaApplication } from './application'
import { OpenerService } from "./opener-service"
import { CommandContribution, CommandContributionProvider, CommandRegistry } from "../common/command"
import { MenuModelRegistry, MenuContribution, MenuContributionProvider } from "../common/menu"
import { KeybindingContextRegistry, KeybindingRegistry } from "../common/keybinding"

export const browserApplicationModule = new ContainerModule(bind => {
    bind(TheiaApplication).toSelf().inSingletonScope()
    bind(OpenerService).toSelf().inSingletonScope()
    bind(CommandRegistry).toSelf().inSingletonScope()
    bind(CommandContribution).to(CommonCommandContribution)
    bind(CommandContributionProvider).toFactory<CommandContribution[]>(ctx => {
        return () => ctx.container.getAll<CommandContribution>(CommandContribution)
    })
    bind(MenuContribution).to(CommonMenuContribution)
    bind(MenuContributionProvider).toFactory<MenuContribution[]>(ctx => {
        return () => ctx.container.getAll<MenuContribution>(MenuContribution)
    })
    bind(MenuModelRegistry).toSelf().inSingletonScope();
    bind(KeybindingRegistry).toSelf().inSingletonScope()
    bind(KeybindingContextRegistry).toSelf().inSingletonScope()
    bind(SelectionService).toSelf().inSingletonScope();
});
