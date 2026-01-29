import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import z from "zod";

const questionSchema = z.object({
  question_text: z.string().min(3),
  option_1: z.string().optional(),
  option_2: z.string().optional(),
  option_3: z.string().optional(),
  option_4: z.string().optional(),
  option_5: z.string().optional(),
  is_correct_1: z.boolean().default(false).optional(),
  is_correct_2: z.boolean().default(false).optional(),
  is_correct_3: z.boolean().default(false).optional(),
  is_correct_4: z.boolean().default(false).optional(),
  is_correct_5: z.boolean().default(false).optional(),
  explanation_1: z.string().optional(),
  explanation_2: z.string().optional(),
  explanation_3: z.string().optional(),
  explanation_4: z.string().optional(),
  explanation_5: z.string().optional(),
  score: z.number().min(1),
});

export default function CreateQuestionModal() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Add Question</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Question</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Option 1</FieldLegend>
              <FieldGroup>
                <Field>
                  <FieldLabel>Option Text</FieldLabel>
                  <Input placeholder="Option Text" />
                </Field>
                <Field>
                  <FieldLabel>Option Text</FieldLabel>
                  <Input placeholder="Option Text" />
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSet>
              <FieldLegend>Option 1</FieldLegend>
              <FieldGroup>
                <Field>
                  <FieldLabel>Option Text</FieldLabel>
                  <Input placeholder="Option Text" />
                </Field>
                <Field>
                  <FieldLabel>Option Text</FieldLabel>
                  <Input placeholder="Option Text" />
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSet>
              <FieldLegend>Option 1</FieldLegend>
              <FieldGroup>
                <Field>
                  <FieldLabel>Option Text</FieldLabel>
                  <Input placeholder="Option Text" />
                </Field>
                <Field>
                  <FieldLabel>Option Text</FieldLabel>
                  <Input placeholder="Option Text" />
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSet>
              <FieldLegend>Option 1</FieldLegend>
              <FieldGroup>
                <Field>
                  <FieldLabel>Option Text</FieldLabel>
                  <Input placeholder="Option Text" />
                </Field>
                <Field>
                  <FieldLabel>Option Text</FieldLabel>
                  <Input placeholder="Option Text" />
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSet>
              <FieldLegend>Option 1</FieldLegend>
              <FieldGroup>
                <Field>
                  <FieldLabel>Option Text</FieldLabel>
                  <Input placeholder="Option Text" />
                </Field>
                <Field>
                  <FieldLabel>Option Text</FieldLabel>
                  <Input placeholder="Option Text" />
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSet>
              <FieldLegend>Option 1</FieldLegend>
              <FieldGroup>
                <Field>
                  <FieldLabel>Option Text</FieldLabel>
                  <Input placeholder="Option Text" />
                </Field>
                <Field>
                  <FieldLabel>Option Text</FieldLabel>
                  <Input placeholder="Option Text" />
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </DialogContent>
      </form>
    </Dialog>
  );
}
