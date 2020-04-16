import styled from "styled-components";
import colors from "../../static/Colors";

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 20px;
  background-color: #fff;
`;

export const Header = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  padding-top: 10px;
`;

export const TodayText = styled.Text`
  color: ${colors.darkBlue};
  font-size: 20px;
  font-weight: 700;
`;

export const DateText = styled.Text`
  color: #3c4a6b;
  font-size: 16px;
  font-weight: 500;
`;

export const Content = styled.View`
  width: 100%;
`;

export const CovidTextContainer = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 20px;
`;

export const CovidText = styled.Text`
  color: ${colors.darkBlue};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const InformationContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

export const InformationCard = styled.View`
  width: 47.5%;
  padding: 15px;
  border-width: 0.8px;
  border-color: #dae1e4;
  border-radius: 5px;
  margin-left: 2.5%;
  margin-top: 3.5%;
`;

export const InformationHeader = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const InformationColor = styled.View`
  width: ${(props) => (props.color ? 13 : 0)};
  height: ${(props) => (props.color ? 13 : 0)};
  border-radius: 2px;
  margin-right: ${(props) => (props.color ? 8 : 0)};
  background-color: ${(props) => (props.color ? props.color : "transparent")};
`;

export const InformationTitle = styled.Text`
  font-size: 15px;
  color: ${colors.gray};
  font-weight: 500;
`;

export const InformationNumber = styled.Text`
  font-size: 18px;
  margin-top: 10px;
  color: ${colors.darkBlue};
  font-weight: 600;
`;

export const WorldMapContainer = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
`;

export const WorldMap = styled.Image`
  width: 350px;
  height: 179px;
`;

export const ChartsContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ChartsInformationContainer = styled.View`
  flex-direction: column;
`;

export const ChartsInformationItem = styled.View`
  display: flex;
  margin-bottom: 10px;
`;

export const ChartsInformationHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ChartsInformationItemIcon = styled.View`
  width: 20px;
  height: 7px;
  border-radius: 51px;
  background-color: ${(props) => props.color};
  margin-right: 5px;
`;

export const ChartsInformationNumber = styled.Text`
  font-size: 18px;
  color: ${colors.darkBlue};
  font-weight: 600;
  margin-left: 25px;
`;

export const FooterInformation = styled.View`
  width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LastUpdate = styled.Text`
  font-size: 10px;
  color: ${colors.gray};
`;
