"use client"

import { Heading } from "@/components/canvas/heading";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SuggestionInput } from "@/lib/validations/user.schema";
import { Button, Grid, Input, Spacer, Textarea } from "@nextui-org/react";
import { Suggestion } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface SuggestionPageProps {
    initialData: Suggestion | null
}

type SuggestionsFormValue = z.infer<typeof SuggestionInput>

const SuggestionForm: React.FC<SuggestionPageProps> = ({
    initialData,
}) => {

    const router = useRouter()
    const params = useParams()

    const heading = initialData ? "Edit your Suggestion" : "Add a new Suggestion";
    const actions = initialData ? "Update Suggestion" : "Create Suggestion"

    const form = useForm<SuggestionsFormValue>({
        resolver: zodResolver(SuggestionInput),
        defaultValues: initialData || {
            title: "",
            description: ""
        },
    });
    
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: SuggestionsFormValue) => {
        // const payload = JSON.stringify({ title, description })
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.userid}/suggestions/${params.suggestionId}`, data)

                toast.success("Suggestion Updated Successfully")
            } else {
                const response = await axios.post(`/api/${params.userid}/suggestions`, data)
                console.log("Suggestion created successfully", response)
                toast.success("Suggestion Created Successfully")
            }

            router.refresh();
            router.replace(`/${params.userid}/suggestions`)

        } catch (error) {
            toast.error('Can not create a suggestion');
            console.log('error: ', error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-[50%] p-32">
            <h2 className="flex text-[40px] items-center justify-center mb-[-10px] mt-[-85px]">We believe in your Suggestions for us.</h2>
            <Spacer y={3} />
            <Heading title={heading} />
            {/* <div className="ml-5">
                <Input
                    color="success"
                    clearable
                    underlined
                    labelPlaceholder="Title"
                    size="md"
                    width="20rem"
                    fullWidth
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <Spacer y={1.5} />
            <Grid.Container gap={2.5}>
                <Grid>
                    <Textarea
                        role="checkbox"
                        size="xl"
                        width="50rem"
                        rows={5}
                        color="success"
                        labelPlaceholder="Give your suggestion"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Grid>
            </Grid.Container> */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-32">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="flex-1 w-full">
                                <FormLabel className="flex text-lg">Title</FormLabel>
                                <FormControl className="flex w-32">
                                    <Textarea
                                        disabled={loading}
                                        placeholder="Please add some title"
                                        rows={1}
                                        width="30rem"
                                        underlined
                                        cols={10}
                                        bordered
                                        borderWeight="light"
                                        color="success"
                                        {...field} />
                                    {/* <Input disabled={loading} placeholder="Please add some title" {...field} /> */}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="mt-10">
                                <FormLabel className="flex text-lg">Description</FormLabel>
                                <FormControl
                                    className="flex flex-col"
                                >
                                    <Textarea
                                        color="success"
                                        disabled={loading}
                                        placeholder="Please add some description"
                                        rows={5}
                                        size="md"
                                        bordered
                                        borderWeight="light"
                                        animated
                                        className=" flex"
                                        width="30rem"
                                        {...field} />
                                    {/* <Input className="w-[32rem]" disabled={loading} placeholder="Please add some description" {...field} /> */}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        rounded bordered shadow
                        className="mt-10"
                        color="gradient"
                        size="sm"
                        auto
                        autoFocus
                        ripple
                        type="submit"
                    >
                        {actions}
                    </Button>
                </form>
            </Form>
        </div >
    );
}

export default SuggestionForm;