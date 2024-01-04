import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/text-area"
import { FormError } from "../formError/formError"

type Props = {
    label: string
    message: string
    control?: any
    name: string
    errorMessage?: string
}

export function TextareaWithLabel({ label, message, control, name, errorMessage }: Props) {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <FormError errorMessage={errorMessage}>
                <Label htmlFor={name}>{label}</Label>
                <Textarea placeholder={message} id={name} {...control?.register(name)} />
            </FormError>
        </div>
    )
}
