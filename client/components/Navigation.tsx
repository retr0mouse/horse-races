import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

let activeClassName = "current"

const ListItem = styled.li`
    padding: 20px;

    a{
        color: white;
        text-decoration: none;
    }

    *, *::before, *::after {
      box-sizing: inherit;
      padding: 0;
      margin: 0;
    }
    
    .current {
        border-bottom: 4px solid white;
    }
`;

const UnorderedList = styled.ul`
    list-style: none;
    display: flex;
    background-color: black;
    margin-bottom: 20px;
`;

export function Navigation(): ReactElement {
    return (
        <nav>
            <UnorderedList>
                <ListItem>
                    <NavLink
                        className={
                            ({ isActive }) => isActive ? activeClassName : undefined
                        }
                        to="/registration"
                    >
                        Registration page
                    </NavLink>
                </ListItem>
                <ListItem>
                    <NavLink
                        className={
                            ({ isActive }) => isActive ? activeClassName : undefined
                        }
                        to="/create_race"
                    >
                        Races
                    </NavLink>
                </ListItem>
                <ListItem>
                    <NavLink
                        className={
                            ({ isActive }) => isActive ? activeClassName : undefined
                        }
                        to="/bet"
                    >
                        Bet
                    </NavLink>
                </ListItem>
                <ListItem>
                    <NavLink
                        className={
                            ({ isActive }) => isActive ? activeClassName : undefined
                        }
                        to="/raceStart"
                    >
                        Start a race
                    </NavLink>
                </ListItem>
                <ListItem>
                    <NavLink
                        className={
                            ({ isActive }) => isActive ? activeClassName : undefined
                        }
                        to="/results"
                    >
                        Race results
                    </NavLink>
                </ListItem>
            </UnorderedList>
        </nav>
    );
}
