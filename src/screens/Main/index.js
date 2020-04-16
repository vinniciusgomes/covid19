import React, { Component } from "react";
import { ScrollView, RefreshControl, Text } from "react-native";
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
  FooterInformation,
  LastUpdate,
} from "./styles";
import api from "../../services/api";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: [],
      data: [],
      loading: true,
      refreshing: false,
      lastUpdate: null,
    };
  }

  componentDidMount() {
    this.requestApiData();
  }

  requestApiData = async () => {
    await api.get("confirmed").then((response) => {
      this.setState({
        cases: response.data,
        lastUpdate: moment(new Date()).utcOffset(-3).format("HH:mm"),
      });
      this.organizationData();
    });
  };

  organizationData = () => {
    let { cases } = this.state;
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
    this.setState({
      data,
      loading: false,
      refreshing: false,
    });
  };

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.requestApiData();
  };

  render() {
    setTimeout(() => {
      this.requestApiData();
    }, 180000);
    const { cases, data, loading, refreshing, lastUpdate } = this.state;
    return (
      <Container>
        {loading ? null : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                tintColor={colors.darkBlue}
                refreshing={refreshing}
                onRefresh={this.onRefresh}
              />
            }
          >
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
                  outerRadius={"100%"}
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
                    {this.formatNumber(cases[2].Recovered)}
                  </InformationNumber>
                </InformationCard>
                <InformationCard>
                  <InformationHeader>
                    <InformationColor color={colors.red} />
                    <InformationTitle>Death</InformationTitle>
                  </InformationHeader>
                  <InformationNumber>
                    {this.formatNumber(cases[2].Deaths)}
                  </InformationNumber>
                </InformationCard>
                <InformationCard>
                  <InformationHeader>
                    <InformationColor color={colors.blue} />
                    <InformationTitle>Confirmed</InformationTitle>
                  </InformationHeader>
                  <InformationNumber>
                    {this.formatNumber(cases[2].Confirmed)}
                  </InformationNumber>
                </InformationCard>
                <InformationCard>
                  <InformationHeader>
                    <InformationColor />
                    <InformationTitle>Total</InformationTitle>
                  </InformationHeader>
                  <InformationNumber>
                    {this.formatNumber(
                      cases[2].Recovered + cases[2].Confirmed + cases[2].Deaths
                    )}
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
            <FooterInformation>
              <LastUpdate>
                Last update: {lastUpdate.replace(":", "h")}
              </LastUpdate>
            </FooterInformation>
          </ScrollView>
        )}
      </Container>
    );
  }
}
