"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { stepSchema, TStepRequest, TStepResponse } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const StepForm = ({
  initStep,
  numberOfSteps,
  mutateData,
}: {
  initStep?: TStepResponse;
  numberOfSteps: number;
  mutateData: (data: TStepRequest) => Promise<void>;
}) => {
  const form = useForm<z.infer<typeof stepSchema>>({
    resolver: zodResolver(stepSchema),
    defaultValues: {
      title: initStep?.title || "",
      description: initStep?.description || "",
      days: initStep?.days || 7,
      orderIndex: initStep?.orderIndex || numberOfSteps + 1,
    },
  });

  const onSubmit = async (data: z.infer<typeof stepSchema>) => {
    const finalData = {
      ...data,
      ...(initStep && { id: initStep.id }),
    };

    await mutateData(finalData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="shadcn-form rounded-md border-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-x-[20px]">
          <FormField
            control={form.control}
            name="days"
            render={({ field }) => (
              <FormItem className="relative grow">
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value ? field.value : ""}
                    onChange={(e) =>
                      field.onChange(Number.parseInt(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <span className="absolute right-[35px] top-[30px] opacity-50">
                  days
                </span>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="orderIndex"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Order number</FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(
                      value === "next" ? numberOfSteps + 1 : Number(value),
                    )
                  }
                  defaultValue={initStep ? String(field.value) : "next"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select order" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="next">Place Next</SelectItem>
                    {Array.from({ length: numberOfSteps }, (_, i) => (
                      <SelectItem key={i} value={String(i + 1)}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="bg-orange-act text-base"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? "Submitting..."
            : initStep?.id
              ? "Update Step"
              : "Add Step"}
        </Button>
      </form>
    </Form>
  );
};

export default StepForm;
