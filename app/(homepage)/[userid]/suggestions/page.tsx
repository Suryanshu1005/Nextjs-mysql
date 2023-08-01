"use client"

import { Button, Grid, Input, Spacer, Textarea } from "@nextui-org/react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const SuggestionPage = () => {

    const router = useRouter()
    const params = useParams()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const suggestionSubmit = async () => {
        const payload = JSON.stringify({ title, description })

        if (!title || !description) {
            toast.error('Please enter required credentials')
            return
        }
        try {
            const response = await axios.post(`/api/${params.userid}/suggestions`, payload)
            console.log("Suggestion created successfully", response)
            setTitle('')
            setDescription('')
            toast.success("Suggestion Created Successfully")
            router.refresh();
            router.replace(`/${params.userid}/homepage`)

        } catch (error) {
            toast.error('Can not create a suggestion');
            console.log('error: ', error)
        }
    }
    return (
        <div className="p-20 w-[50%]">
            <Spacer y={2} />
            <div className="ml-5">
                <Input
                    color="success"
                    clearable
                    underlined
                    labelPlaceholder="Title"
                    placeholder="I think ..."
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
                <Grid>
                    <Button 
                    rounded bordered shadow 
                    color="gradient"
                    size="sm"
                    auto
                    autoFocus
                    ripple 
                    onPress={suggestionSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid.Container>
        </div>
    );
}

export default SuggestionPage;