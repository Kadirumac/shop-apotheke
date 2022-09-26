import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { languageList } from "../../lib/data";
import { getPopularRepos } from "../../lib/fetchData";
import { setPopularRepoList, setLoading } from "../../reducers/RepoListSlice";
import "./navigation.scss";

function Navigation() {
  const dispatch = useDispatch();

  const languageHandler = async (language: string) => {
    dispatch(setLoading(true));
    const data = await getPopularRepos(language);
    dispatch(setPopularRepoList(data));
    dispatch(setLoading(false));
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className="home-text" href="/">
              Popular Repositories Home
            </Nav.Link>
            <Nav.Link className="home-text" href="/starred-repos">
              My Favourite Repositories
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              className="lang-text"
              title="Coding Language"
              id="navbarScrollingDropdown"
            >
              {languageList.map((item: string, index: number) => (
                <NavDropdown.Item
                  onClick={() => languageHandler(item)}
                  key={index}
                >
                  {item}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
