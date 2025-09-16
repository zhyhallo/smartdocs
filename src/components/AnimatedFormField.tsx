import React, { useState, useEffect, forwardRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Warning, CheckCircle, Eye, EyeSlash } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  email?: boolean
  phone?: boolean
  custom?: (value: string) => string | null
}

interface AnimatedFormFieldProps extends Omit<React.ComponentProps<typeof Input>, 'onChange'> {
  label: string
  icon?: React.ReactNode
  validation?: ValidationRule
  onChange: (value: string, isValid: boolean, error?: string) => void
  value: string
  showValidation?: boolean
  debounceMs?: number
}

const AnimatedFormField = forwardRef<HTMLInputElement, AnimatedFormFieldProps>(
  ({ 
    label, 
    icon, 
    validation = {}, 
    onChange, 
    value, 
    showValidation = true,
    debounceMs = 500,
    type = "text",
    className,
    ...props 
  }, ref) => {
    const [focused, setFocused] = useState(false)
    const [touched, setTouched] = useState(false)
    const [validationError, setValidationError] = useState<string | null>(null)
    const [isValid, setIsValid] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout>()

    // Validate field value
    const validateField = (fieldValue: string): { isValid: boolean; error: string | null } => {
      if (!validation) return { isValid: true, error: null }

      // Required validation
      if (validation.required && !fieldValue.trim()) {
        return { isValid: false, error: `${label} є обов'язковим полем` }
      }

      if (!fieldValue.trim()) {
        return { isValid: true, error: null }
      }

      // Length validations
      if (validation.minLength && fieldValue.length < validation.minLength) {
        return { 
          isValid: false, 
          error: `${label} повинен містити мінімум ${validation.minLength} символів` 
        }
      }

      if (validation.maxLength && fieldValue.length > validation.maxLength) {
        return { 
          isValid: false, 
          error: `${label} повинен містити максимум ${validation.maxLength} символів` 
        }
      }

      // Email validation
      if (validation.email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(fieldValue)) {
          return { isValid: false, error: "Введіть коректний email адрес" }
        }
      }

      // Phone validation
      if (validation.phone) {
        const phonePattern = /^\+?[1-9]\d{1,14}$/
        if (!phonePattern.test(fieldValue.replace(/\s/g, ""))) {
          return { isValid: false, error: "Введіть коректний номер телефону" }
        }
      }

      // Pattern validation
      if (validation.pattern && !validation.pattern.test(fieldValue)) {
        return { isValid: false, error: `${label} має неправильний формат` }
      }

      // Custom validation
      if (validation.custom) {
        const customError = validation.custom(fieldValue)
        if (customError) {
          return { isValid: false, error: customError }
        }
      }

      return { isValid: true, error: null }
    }

    // Debounced validation
    useEffect(() => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }

      const timer = setTimeout(() => {
        const { isValid: fieldIsValid, error } = validateField(value)
        setIsValid(fieldIsValid)
        setValidationError(error)
        onChange(value, fieldIsValid, error || undefined)
      }, debounceMs)

      setDebounceTimer(timer)

      return () => {
        if (timer) clearTimeout(timer)
      }
    }, [value, validation, debounceMs])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      onChange(newValue, isValid, validationError || undefined)
    }

    const handleFocus = () => {
      setFocused(true)
    }

    const handleBlur = () => {
      setFocused(false)
      setTouched(true)
    }

    const shouldShowError = touched && !focused && validationError && showValidation
    const shouldShowSuccess = touched && !validationError && value.trim() && validation?.required

    // Animation variants
    const fieldVariants = {
      idle: { 
        borderColor: "oklch(0.88 0.04 240)",
        boxShadow: "0 0 0 0px transparent"
      },
      focused: { 
        borderColor: "oklch(0.55 0.22 240)",
        boxShadow: "0 0 0 2px oklch(0.55 0.22 240 / 0.2)",
        transition: { duration: 0.2 }
      },
      error: { 
        borderColor: "oklch(0.68 0.22 15)",
        boxShadow: "0 0 0 2px oklch(0.68 0.22 15 / 0.2)",
        x: [0, -5, 5, -5, 5, 0],
        transition: { 
          borderColor: { duration: 0.2 },
          boxShadow: { duration: 0.2 },
          x: { duration: 0.5, ease: "easeInOut" }
        }
      },
      success: { 
        borderColor: "oklch(0.7 0.15 145)",
        boxShadow: "0 0 0 2px oklch(0.7 0.15 145 / 0.2)",
        transition: { duration: 0.2 }
      }
    }

    const labelVariants = {
      idle: { 
        y: 0, 
        scale: 1, 
        color: "oklch(0.45 0.06 240)" 
      },
      focused: { 
        y: -24, 
        scale: 0.85, 
        color: "oklch(0.55 0.22 240)",
        transition: { duration: 0.2, ease: "easeOut" }
      },
      filled: { 
        y: -24, 
        scale: 0.85, 
        color: "oklch(0.45 0.06 240)",
        transition: { duration: 0.2, ease: "easeOut" }
      }
    }

    const iconVariants = {
      idle: { 
        color: "oklch(0.55 0.22 240)", 
        scale: 1 
      },
      focused: { 
        color: "oklch(0.55 0.22 240)", 
        scale: 1.1,
        transition: { duration: 0.2 }
      },
      error: { 
        color: "oklch(0.68 0.22 15)", 
        scale: 1.1,
        transition: { duration: 0.2 }
      },
      success: { 
        color: "oklch(0.7 0.15 145)", 
        scale: 1.1,
        transition: { duration: 0.2 }
      }
    }

    const getFieldState = () => {
      if (shouldShowError) return "error"
      if (shouldShowSuccess) return "success"
      if (focused) return "focused"
      return "idle"
    }

    const getLabelState = () => {
      if (focused || value) return focused ? "focused" : "filled"
      return "idle"
    }

    const actualType = type === "password" && showPassword ? "text" : type

    return (
      <div className="relative space-y-1">
        <div className="relative">
          {/* Icon */}
          {icon && (
            <motion.div
              className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
              variants={iconVariants}
              animate={getFieldState()}
            >
              {icon}
            </motion.div>
          )}

          {/* Input Field */}
          <motion.div
            className="relative"
            variants={fieldVariants}
            animate={getFieldState()}
          >
            <Input
              ref={ref}
              type={actualType}
              value={value}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={cn(
                "peer h-12 transition-all duration-200",
                icon ? "pl-10" : "pl-3",
                (type === "password" && value) ? "pr-10" : "pr-3",
                className
              )}
              placeholder=" " // Important for floating label
              {...props}
            />

            {/* Floating Label */}
            <motion.label
              className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none bg-background px-2 font-medium text-sm origin-left"
              style={{ left: icon ? "2.5rem" : "0.75rem" }}
              variants={labelVariants}
              animate={getLabelState()}
            >
              {label}
              {validation?.required && <span className="text-destructive ml-1">*</span>}
            </motion.label>

            {/* Password Toggle */}
            {type === "password" && value && (
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
              </motion.button>
            )}

            {/* Validation Icon */}
            <AnimatePresence>
              {shouldShowError && (
                <motion.div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Warning size={16} className="text-destructive" />
                </motion.div>
              )}
              {shouldShowSuccess && (
                <motion.div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <CheckCircle size={16} className="text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {shouldShowError && (
            <motion.div
              className="flex items-center gap-1 text-sm text-destructive"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Warning size={14} />
              <span>{validationError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {shouldShowSuccess && (
            <motion.div
              className="flex items-center gap-1 text-sm text-green-500"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <CheckCircle size={14} />
              <span>Поле заповнено правильно</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

AnimatedFormField.displayName = "AnimatedFormField"

export default AnimatedFormField