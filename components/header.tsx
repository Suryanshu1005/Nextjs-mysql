import { AuthContext } from "@/provider/AuthProvider";
import { Grid, Popover, User } from "@nextui-org/react";
import { useContext } from "react";
import Logout from "./canvas/logout";
import Navbar from "./navbar";

const Header = () => {

    const { user, error } = useContext(AuthContext);
    return (
        <div className="flex p-4 backdrop-filter backdrop-blur-xl bg-white bg-opacity-70 shadow-md sticky z-100 border-black">
            <Grid.Container className="flex justify-between" >
                <Grid direction="row" alignItems="center" className="flex gap-4">
                    <Popover>
                        <Popover.Trigger>
                            <User
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                name={user?.username}
                                zoomed
                                bordered
                                color="gradient"
                            />
                        </Popover.Trigger>
                        <div>
                            <Popover.Content>
                                <Logout />
                            </Popover.Content>
                        </div>
                    </Popover>
                </Grid>
                <Navbar />
            </Grid.Container>

        </div>
    );
}

export default Header;