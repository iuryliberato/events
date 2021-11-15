import styled from "styled-components";
import { device } from "../Helpers/style.components/sizes";

export const Container = styled.div`
  width: 100%;
  max-width: ${(props) => props.width || "1400px"};
  margin: 0 auto;

  @media ${device.smallerThanDesktop} {
  }

  @media ${device.desktop} {
  }
`;
