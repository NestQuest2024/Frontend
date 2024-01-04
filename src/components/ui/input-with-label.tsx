import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Control} from "react-hook-form";

type Props = {
    name: string;
    control: Control<any, any>;
    label: string;
    type: string;
};

export function InputWithLabel({ label, name, control, type }: Props) {

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>{label}</Label>
            <Input type= {type}
            placeholder={label}  
            {...control?.register(name)} />
        </div>
    )
}
