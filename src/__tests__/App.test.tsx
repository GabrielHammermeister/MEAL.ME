import HomePage from "@/pages/Home/HomePage.index";
import {render} from "@testing-library/react";
import {UserProvider} from "@/providers/User.provider";

function withUserProvider(Component: React.ReactNode) {
    return (
        <UserProvider >
            {Component}
        </UserProvider>
    )
}

test('Renders main page correctly', () => {
    render(<HomePage/>)
});
