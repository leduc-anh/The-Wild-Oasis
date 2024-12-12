import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"
import styled from "styled-components"
const StyledAppLayout = styled.div`
display: grid;
height: 100vh;
grid-template-columns: 26rem 1fr;
grid-template-rows: auto 1fr;
`
const Main = styled.main`
    background-color: var(--color-grey-100);
    padding: 4.8rem;
    height: 100vh;
    flex: 1;
    overflow: auto;
`
function AppLayout() {
    return (
        <StyledAppLayout>
            <Header />
            <Sidebar />
            <Main>
                <Outlet />
            </Main>
        </StyledAppLayout>
    )
}

export default AppLayout
