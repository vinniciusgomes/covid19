import React, { Component } from "react";
import { ScrollView } from "react-native";
import { PieChart } from "react-native-svg-charts";
import moment from "moment";

import colors from "../../static/Colors";
import {
  Container,
  Header,
  TodayText,
  DateText,
  Content,
  CovidTextContainer,
  CovidText,
  InformationContainer,
  InformationCard,
  InformationColor,
  InformationHeader,
  InformationTitle,
  InformationNumber,
  WorldMap,
  WorldMapContainer,
  ChartsContainer,
  ChartsInformationContainer,
  ChartsInformationHeader,
  ChartsInformationItemIcon,
  ChartsInformationItem,
  ChartsInformationNumber,
} from "./styles";
import api from "../../services/api";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: [],
      data: [],
      confirmed: null,
      recovered: null,
      deaths: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.requestApiData();
  }

  requestApiData = async () => {
    await api.get("confirmed").then((response) => {
      this.setState({ cases: response.data });
      this.organizationData();
    });
  };

  organizationData = () => {
    let { cases } = this.state;
    let confirmed = cases[2].Confirmed;
    let recovered = cases[2].Recovered;
    let deaths = cases[2].Deaths;
    let data = [
      {
        key: 1,
        amount: cases[2].Confirmed,
        svg: { fill: colors.blue },
      },
      {
        key: 2,
        amount: cases[2].Recovered,
        svg: { fill: colors.lightBlue },
      },
      {
        key: 3,
        amount: cases[2].Deaths,
        svg: { fill: colors.red },
      },
    ];
    this.setState({ data, confirmed, recovered, deaths, loading: false });
  };

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  render() {
    const { data, confirmed, recovered, deaths, loading } = this.state;
    return (
      <Container>
        {loading ? null : (
          <ScrollView>
            <Header>
              <TodayText>Today's Report</TodayText>
              <DateText>{moment(new Date()).format("DD, MMM YYYY")}</DateText>
            </Header>
            <Content>
              <CovidTextContainer>
                <CovidText>COVID - 19 Brazil Cases</CovidText>
              </CovidTextContainer>

              <ChartsContainer>
                <PieChart
                  style={{ height: 200, width: 200 }}
                  valueAccessor={({ item }) => item.amount}
                  data={data}
                  spacing={0}
                  outerRadius={"95%"}
                />

                <ChartsInformationContainer>
                  <ChartsInformationItem>
                    <ChartsInformationHeader>
                      <ChartsInformationItemIcon color={colors.blue} />
                      <InformationTitle>Confirmed</InformationTitle>
                    </ChartsInformationHeader>
                    {/* <ChartsInformationNumber>50%</ChartsInformationNumber> */}
                  </ChartsInformationItem>

                  <ChartsInformationItem>
                    <ChartsInformationHeader>
                      <ChartsInformationItemIcon color={colors.lightBlue} />
                      <InformationTitle>Recovered</InformationTitle>
                    </ChartsInformationHeader>
                    {/* <ChartsInformationNumber>50%</ChartsInformationNumber> */}
                  </ChartsInformationItem>

                  <ChartsInformationItem>
                    <ChartsInformationHeader>
                      <ChartsInformationItemIcon color={colors.red} />
                      <InformationTitle>Death</InformationTitle>
                    </ChartsInformationHeader>
                    {/* <ChartsInformationNumber>50%</ChartsInformationNumber> */}
                  </ChartsInformationItem>
                </ChartsInformationContainer>
              </ChartsContainer>

              <InformationContainer>
                <InformationCard>
                  <InformationHeader>
                    <InformationColor color={colors.lightBlue} />
                    <InformationTitle>Recovered</InformationTitle>
                  </InformationHeader>
                  <InformationNumber>
                    {this.formatNumber(recovered)}
                  </InformationNumber>
                </InformationCard>
                <InformationCard>
                  <InformationHeader>
                    <InformationColor color={colors.red} />
                    <InformationTitle>Death</InformationTitle>
                  </InformationHeader>
                  <InformationNumber>
                    {this.formatNumber(deaths)}
                  </InformationNumber>
                </InformationCard>
                <InformationCard>
                  <InformationHeader>
                    <InformationColor color={colors.blue} />
                    <InformationTitle>Confirmed</InformationTitle>
                  </InformationHeader>
                  <InformationNumber>
                    {this.formatNumber(confirmed)}
                  </InformationNumber>
                </InformationCard>
                <InformationCard>
                  <InformationHeader>
                    <InformationColor />
                    <InformationTitle>Total</InformationTitle>
                  </InformationHeader>
                  <InformationNumber>
                    {this.formatNumber(recovered + confirmed + deaths)}
                  </InformationNumber>
                </InformationCard>
              </InformationContainer>

              <WorldMapContainer>
                <WorldMap
                  source={require("../../static/worldmap.png")}
                  resizeMode="cover"
                />
              </WorldMapContainer>
            </Content>
          </ScrollView>
        )}
      </Container>
    );
  }
}
