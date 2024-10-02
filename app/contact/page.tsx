"use client"

import * as React from "react"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, BookOpenText } from "lucide-react"
import { useEffect, useState } from "react"
import { Textarea } from "@/components/ui/textarea"

type FormData = {
  name: string
  email: string
  reason: string
  exactReason: string
  message: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  reason: '',
  exactReason: '',
  message: '',
}

type FieldRequirement = {
  [K in keyof FormData]: boolean
}

const requiredFields: FieldRequirement = {
  name: true,
  email: true,
  reason: true,
  exactReason: false,
  message: true,
}

const characterLimits = {
  name: 125,
  email: 250,
  reason: 50,
  exactReason: 250,
  message: 8388608,
}

export default function Contact() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isStepValid(step)) {
      const messageContent = {
        name: formData.name,
        email: formData.email,
        reason: formData.reason,
        exactReason: formData.exactReason,
        message: formData.message,
      };

      try {
        const response = await fetch('/api/sendMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageContent),
        });

        if (response.ok) {
          toast({
            title: "Success",
            description: "Your message has been sent successfully!",
          });
          setFormData(initialFormData);
          setStep(1);
        } else {
          const errorData = await response.json();
          toast({
            title: "Error",
            description: errorData.error || "An error occurred while sending the message.",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "An error occurred while sending the message.",
        });
      }
    }
  };

  const steps = [
    { title: 'Personal Info', fields: ['name', 'email'] },
    { title: 'Reason', fields: ['reason'] },
    { title: 'Message', fields: ['message'] },
  ]

  const isStepValid = (stepIndex: number) => {
    const currentStepFields = steps[stepIndex - 1].fields as (keyof FormData)[]
    const stepErrors: Partial<FormData> = {}
    let isValid = true

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    currentStepFields.forEach(field => {
      if (requiredFields[field]) {
        if (Array.isArray(formData[field])) {
          if ((formData[field] as string[]).length === 0) {
            stepErrors[field] = 'This field is required'
            isValid = false
          }
        } else if (!formData[field]) {
          stepErrors[field] = 'This field is required'
          isValid = false
        }
      }
      if (field === 'email' && !emailRegex.test(formData.email)) {
        stepErrors.email = 'Invalid email address'
        isValid = false
      }
      if (field === 'reason' && formData.reason === 'other' && !formData.exactReason) {
        stepErrors.exactReason = 'This field is required'
        isValid = false
      }
      if (field === 'message' && !formData.message) {
        stepErrors.message = 'This field is required'
        isValid = false
      }
      if (field in characterLimits && formData[field].length > characterLimits[field]) {
        stepErrors[field] = `This field exceeds the ${characterLimits[field]} characters limit`
        isValid = false
      }
    })
    setErrors(stepErrors)
    return isValid
  }

  const handleNext = () => {
    if (isStepValid(step)) {
      setStep(step + 1)
    }
  }

  useEffect(() => {
    setErrors({})
  }, [step])

  const RequiredLabel: React.FC<{ htmlFor: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
    <Label htmlFor={htmlFor}>
      {children}
      <span className="text-red-500 ml-1">*</span>
    </Label>
  )

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-[500px] gap-16 font-[family-name:var(--font-geist-sans)]">
        <CardHeader>
          <CardTitle className="text-center inline-flex items-center gap-x-2 mx-auto">
            <BookOpenText /> CONTACT ME
          </CardTitle>
          <CardDescription>Please fill out the required information to contact me.</CardDescription>
          <br />
          <div className="flex justify-between mb-2">
            {steps.map((s, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step > index + 1 ? 'bg-primary text-primary-foreground' :
                  step === index + 1 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                  }`}>
                  {step > index + 1 ? <CheckIcon className="w-5 h-5" /> : index + 1}
                </div>
                <span className="text-xs mt-1">{s.title}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-secondary h-2 rounded-full">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              {step === 1 && (
                <>
                  <div className="flex flex-col space-y-1.5">
                    <RequiredLabel htmlFor="name">Name</RequiredLabel>
                    <Input id="name" value={formData.name} onChange={(e) => updateFormData('name', e.target.value)} placeholder="Your full name." required />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <RequiredLabel htmlFor="email">Email</RequiredLabel>
                    <Input id="email" value={formData.email} onChange={(e) => updateFormData('email', e.target.value)} type="email" placeholder="Your email address." required />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="flex flex-col space-y-1.5">
                    <RequiredLabel htmlFor="reason">Reason</RequiredLabel>
                    <Select onValueChange={(value) => updateFormData('reason', value)}>
                      <SelectTrigger id="reason">
                        <SelectValue placeholder={formData.reason === '' ? 'Select' : formData.reason} />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="question">Question</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
                  </div>
                  {formData.reason === 'other' && (
                    <div className="flex flex-col space-y-1.5">
                      <RequiredLabel htmlFor="exactReason">Input Exact Reason</RequiredLabel>
                      <Input
                        id="exactReason"
                        value={formData.exactReason}
                        onChange={(e) => updateFormData('exactReason', e.target.value)}
                        placeholder="Please specify your exact reason."
                        required={requiredFields.exactReason}
                      />
                      {errors.exactReason && <p className="text-red-500 text-sm mt-1">{errors.exactReason}</p>}
                    </div>
                  )}
                </>
              )}
              {step === 3 && (
                <div className="flex flex-col space-y-1.5">
                  <RequiredLabel htmlFor="message">Message</RequiredLabel>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => updateFormData('message', e.target.value)}
                    placeholder="Your message here."
                    className="w-full h-32 p-2 border border-gray-300 rounded-md"
                    required
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button type="button" onClick={() => setStep(step - 1)} variant="outline">
              <ChevronLeftIcon className="w-4 h-4 mr-2" />
              Previous
            </Button>
          )}
          {step < steps.length ? (
            <Button type="button" onClick={handleNext} className="ml-auto">
              Next
              <ChevronRightIcon className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" onClick={handleSubmit} className="ml-auto">
              Complete
              <CheckIcon className="w-4 h-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
