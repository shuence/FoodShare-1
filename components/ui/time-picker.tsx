"use client"

import * as React from "react"
import { Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface TimePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  minTime?: Date
  maxTime?: Date
}

export function TimePicker({
  value,
  onChange,
  placeholder = "Pick a time",
  disabled = false,
  minTime,
  maxTime,
}: TimePickerProps) {
  const [hours, setHours] = React.useState<string>(
    value ? String(value.getHours()).padStart(2, "0") : "00"
  )
  const [minutes, setMinutes] = React.useState<string>(
    value ? String(value.getMinutes()).padStart(2, "0") : "00"
  )

  const handleApply = () => {
    if (onChange) {
      const newDate = new Date(value || new Date())
      newDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)
      onChange(newDate)
    }
  }

  const timeString = `${hours}:${minutes}`

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-gray-500"
          )}
          disabled={disabled}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value ? timeString : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="space-y-4">
          <div className="flex gap-2 items-center justify-center">
            <div className="flex flex-col items-center">
              <label className="text-xs font-medium text-gray-700 mb-1">
                Hours
              </label>
              <input
                type="number"
                min="0"
                max="23"
                value={hours}
                onChange={(e) => {
                  const val = e.target.value
                  if (val.length <= 2 && parseInt(val) <= 23) {
                    setHours(val.padStart(2, "0"))
                  }
                }}
                className="w-16 px-2 py-1 border border-gray-300 rounded text-center font-semibold"
              />
            </div>
            <span className="text-xl font-semibold mt-5">:</span>
            <div className="flex flex-col items-center">
              <label className="text-xs font-medium text-gray-700 mb-1">
                Minutes
              </label>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => {
                  const val = e.target.value
                  if (val.length <= 2 && parseInt(val) <= 59) {
                    setMinutes(val.padStart(2, "0"))
                  }
                }}
                className="w-16 px-2 py-1 border border-gray-300 rounded text-center font-semibold"
              />
            </div>
          </div>
          <Button onClick={handleApply} className="w-full">
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
