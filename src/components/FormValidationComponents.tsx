import React, { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Warning } from "@phosphor-icons/react"

interface FormValidationState {
  [fieldName: string]: {
    value: string
    isValid: boolean
    error?: string
    touched: boolean
  }
}

interface FormValidationConfig {
  [fieldName: string]: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    email?: boolean
    phone?: boolean
    custom?: (value: string) => string | null
  }
}

interface ValidationSummaryProps {
  validationState: FormValidationState
  className?: string
}

export const ValidationSummary: React.FC<ValidationSummaryProps> = ({ 
  validationState, 
  className = "" 
}) => {
  const errors = Object.entries(validationState)
    .filter(([_, state]) => !state.isValid && state.touched && state.error)
    .map(([fieldName, state]) => ({ fieldName, error: state.error! }))

  const validFields = Object.entries(validationState)
    .filter(([_, state]) => state.isValid && state.touched && state.value.trim())
    .length

  const totalFields = Object.keys(validationState).length
  const completionPercentage = totalFields > 0 ? (validFields / totalFields) * 100 : 0

  if (errors.length === 0 && validFields === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        className={`space-y-3 ${className}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Progress Bar */}
        {validFields > 0 && (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">
                Заповнення форми
              </span>
              <span className="text-sm text-muted-foreground">
                {validFields}/{totalFields}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}

        {/* Success Message */}
        {errors.length === 0 && validFields > 0 && (
          <motion.div
            className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.4, type: "spring" }}
            >
              <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
            </motion.div>
            <span className="text-sm font-medium text-green-800">
              {completionPercentage === 100 
                ? "Всі поля заповнені правильно!"
                : `${validFields} з ${totalFields} полів заповнено правильно`
              }
            </span>
          </motion.div>
        )}

        {/* Error Messages */}
        {errors.length > 0 && (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 text-sm font-medium text-destructive">
              <Warning size={16} />
              <span>Потрібно виправити помилки:</span>
            </div>
            <div className="space-y-2">
              {errors.map(({ fieldName, error }, index) => (
                <motion.div
                  key={fieldName}
                  className="flex items-start gap-2 p-2 bg-destructive/10 border border-destructive/20 rounded-md"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Warning size={14} className="text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-destructive">{error}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

interface UseFormValidationReturn {
  validationState: FormValidationState
  updateField: (fieldName: string, value: string, isValid: boolean, error?: string) => void
  touchField: (fieldName: string) => void
  isFormValid: boolean
  getFieldError: (fieldName: string) => string | undefined
  resetForm: () => void
}

export const useFormValidation = (
  initialFields: string[],
  config: FormValidationConfig = {}
): UseFormValidationReturn => {
  const [validationState, setValidationState] = useState<FormValidationState>(() =>
    initialFields.reduce((acc, fieldName) => ({
      ...acc,
      [fieldName]: {
        value: "",
        isValid: !config[fieldName]?.required,
        touched: false
      }
    }), {})
  )

  const updateField = useCallback((
    fieldName: string, 
    value: string, 
    isValid: boolean, 
    error?: string
  ) => {
    setValidationState(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value,
        isValid,
        error,
        touched: true
      }
    }))
  }, [])

  const touchField = useCallback((fieldName: string) => {
    setValidationState(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        touched: true
      }
    }))
  }, [])

  const resetForm = useCallback(() => {
    setValidationState(prev =>
      Object.keys(prev).reduce((acc, fieldName) => ({
        ...acc,
        [fieldName]: {
          value: "",
          isValid: !config[fieldName]?.required,
          touched: false
        }
      }), {})
    )
  }, [config])

  const isFormValid = Object.values(validationState).every(field => field.isValid)

  const getFieldError = useCallback((fieldName: string) => {
    const field = validationState[fieldName]
    return field?.touched && !field.isValid ? field.error : undefined
  }, [validationState])

  return {
    validationState,
    updateField,
    touchField,
    isFormValid,
    getFieldError,
    resetForm
  }
}

// Floating validation tooltip component
interface FloatingValidationProps {
  isVisible: boolean
  message: string
  type: "error" | "success" | "warning"
  position?: "top" | "bottom" | "left" | "right"
}

export const FloatingValidation: React.FC<FloatingValidationProps> = ({
  isVisible,
  message,
  type,
  position = "bottom"
}) => {
  const getColorClasses = () => {
    switch (type) {
      case "error":
        return "bg-destructive text-destructive-foreground border-destructive/20"
      case "success":
        return "bg-green-500 text-white border-green-400"
      case "warning":
        return "bg-yellow-500 text-yellow-50 border-yellow-400"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getIcon = () => {
    switch (type) {
      case "error":
        return <Warning size={14} />
      case "success":
        return <CheckCircle size={14} />
      case "warning":
        return <Warning size={14} />
      default:
        return null
    }
  }

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full mb-2"
      case "left":
        return "right-full mr-2 top-1/2 -translate-y-1/2"
      case "right":
        return "left-full ml-2 top-1/2 -translate-y-1/2"
      default:
        return "top-full mt-2"
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`absolute z-50 ${getPositionClasses()}`}
          initial={{ opacity: 0, scale: 0.8, y: position === "bottom" ? -10 : 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: position === "bottom" ? -10 : 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className={`px-3 py-2 rounded-lg border text-sm font-medium shadow-lg ${getColorClasses()}`}>
            <div className="flex items-center gap-2">
              {getIcon()}
              <span>{message}</span>
            </div>
          </div>
          {/* Arrow */}
          <div 
            className={`absolute w-2 h-2 rotate-45 border ${getColorClasses()} ${
              position === "bottom" ? "-top-1 left-1/2 -translate-x-1/2 border-b-0 border-r-0" :
              position === "top" ? "-bottom-1 left-1/2 -translate-x-1/2 border-t-0 border-l-0" :
              position === "right" ? "-left-1 top-1/2 -translate-y-1/2 border-t-0 border-r-0" :
              "-right-1 top-1/2 -translate-y-1/2 border-b-0 border-l-0"
            }`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default { ValidationSummary, useFormValidation, FloatingValidation }