"use client";

import { Button, Grid, Input, Spacer, Textarea } from "@nextui-org/react";

const SuggestionPage = () => {



    return (
        <div className="p-20 w-[50%]">
            <Spacer y={2} />
            <div className="ml-5">
                <Input
                    color="success"
                    clearable
                    underlined
                    labelPlaceholder="Title"
                    // initialValue="I think ..."
                    placeholder="I think ..."
                    size="md"
                    width="20rem"
                    fullWidth
                />
            </div>
            <Spacer y={1.5} />
            <Grid.Container gap={2.5}>
                <Grid>
                    <Textarea
                        size="xl"
                        width="50rem"
                        rows={5}
                        color="success"
                        labelPlaceholder="Give your suggestion"
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
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid.Container>
        </div>
    );
}

export default SuggestionPage;