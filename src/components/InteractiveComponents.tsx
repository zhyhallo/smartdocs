import React, { forwardRef } from "react"
import { Button as BaseButton } from "@/components/ui/button"
import { Input as BaseInput } from "@/components/ui/input"
import { useInteractionContext } from "@/hooks/useInteractionContext"
import { type InteractionEvent } from "@/hooks/useInteractiveTerminal"

interface InteractiveButtonProps extends React.ComponentProps<typeof BaseButton> {
  interactionData?: any
  sectionContext?: string
}

export const InteractiveButton = forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  ({ onClick, interactionData, sectionContext, children, ...props }, ref) => {
    const { triggerGlobalInteraction } = useInteractionContext()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const interaction: InteractionEvent = {
        type: "button_click",
        section: sectionContext,
        data: interactionData
      }
      triggerGlobalInteraction(interaction)
      
      onClick?.(e)
    }

    return (
      <BaseButton ref={ref} onClick={handleClick} {...props}>
        {children}
      </BaseButton>
    )
  }
)

InteractiveButton.displayName = "InteractiveButton"

interface InteractiveInputProps extends React.ComponentProps<typeof BaseInput> {
  interactionData?: any
  sectionContext?: string
}

export const InteractiveInput = forwardRef<HTMLInputElement, InteractiveInputProps>(
  ({ onFocus, onBlur, interactionData, sectionContext, ...props }, ref) => {
    const { triggerGlobalInteraction } = useInteractionContext()

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      const interaction: InteractionEvent = {
        type: "form_focus",
        section: sectionContext,
        data: { field: props.name || props.id, ...interactionData }
      }
      triggerGlobalInteraction(interaction)
      
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e)
    }

    return (
      <BaseInput ref={ref} onFocus={handleFocus} onBlur={handleBlur} {...props} />
    )
  }
)

InteractiveInput.displayName = "InteractiveInput"