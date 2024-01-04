import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FormError } from "../formError/formError";
import { Control } from "react-hook-form";

type Props = {
    label: string;
    name: string;
    placeholder: string;
    control: Control<any, any>;
    errorMessage?: string | undefined;
    options: Array<{
        id: number;
        name: string;
    }>;
};

export function SelectInput({ label, placeholder, options, errorMessage, control, name }: Props): React.ReactElement {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <FormError errorMessage={errorMessage}>
                <Label>{label}</Label>
                <Select>
                    <SelectTrigger className="w-full" {...control?.register(name, { valueAsNumber: true })}>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {
                                options.map(({ id, name }) => {
                                    return (
                                        <SelectItem key={id} value={String(id)}>{name}</SelectItem>
                                    )
                                })
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </FormError>
        </div>
    );
}