import React, { useEffect, useState } from 'react';
import { loadMostActiveuMembers, loadTopDestinations, loadTopCountries, loadAvgTripsPerMonth } from '../api';
import { Dimensions, ScrollView, Text } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: () => `#999`,
    labelColor: () => `#375e97`,
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "6",
        strokeWidth: "0",
    }
}

function ChartHeader({ text }) {
    return (
        <Text style={{ width: '100%', textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginVertical: 5 }}>
            {text}
        </Text>
    )
}

function TopMembersChart({ members }) {
    const data = {
        labels: members.map(member => member.user.fullname),
        datasets: [{
            data: members.map(x => x.count),
            color: () => '#ffbb00',
        }]
    };

    return <BarChart width={screenWidth} height={220} data={data} chartConfig={chartConfig} />;
}

function TopDestinationsChart({ destinations }) {
    const data = {
        labels: destinations.map(dest => dest.name),
        datasets: [{
            data: destinations.map(x => x.count),
            color: () => '#ffbb00',
        }]
    };

    return <BarChart width={screenWidth} height={220} data={data} chartConfig={chartConfig} />;
}

function TopVisitedCountriesChart({ countries }) {
    const data = {
        labels: countries.map(dest => dest.countryName),
        datasets: [{
            data: countries.map(x => x.count),
            color: () => '#ffbb00',
            strokeWidth: 0
        }]
    };

    return <BarChart width={screenWidth} height={220} data={data} chartConfig={chartConfig} />;
}

function TripsPerMonthChart({ monthData }) {
    const data = {
        labels: monthData.map(month => month.monthName.substring(0, 3)),
        datasets: [{
            data: monthData.map(x => x.count),
            color: () => `#375e97`,
            strokeWidth: 0
        }]
    };

    return <LineChart data={data} width={screenWidth} height={220} chartConfig={chartConfig} />;
}

export default () => {
    const [topMembers, setTopMembers] = useState([]);
    const [topLocations, setTopLocations] = useState([]);
    const [topCountries, setTopCountries] = useState([]);
    const [avgTripsPerMonth, setAvgTripsPerMonth] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setTopMembers(await loadMostActiveuMembers());
        setTopLocations(await loadTopDestinations());
        setTopCountries(await loadTopCountries());
        setAvgTripsPerMonth(await loadAvgTripsPerMonth());
    }

    return (
        <ScrollView>
            {topMembers.length ? (
                <>
                    <ChartHeader text={'Most active members'} />
                    <TopMembersChart members={topMembers} />
                </>
            ) : null}
            {topLocations.length ? (
                <>
                    <ChartHeader text={'Most visited destinations'} />
                    <TopDestinationsChart destinations={topLocations} />
                </>
            ) : null}
            {topCountries.length ? (
                <>
                    <ChartHeader text={'Most visited countries'} />
                    <TopVisitedCountriesChart countries={topCountries} />
                </>
            ) : null}
            {avgTripsPerMonth.length ? (
                <>
                    <ChartHeader text={'Trips per month'} />
                    <TripsPerMonthChart monthData={avgTripsPerMonth} />
                </>
            ) : null}

        </ScrollView>
    )
}
