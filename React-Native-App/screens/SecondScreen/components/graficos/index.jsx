import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { VictoryPie } from 'victory-native';
import styled from 'styled-components/native';

const graphicColor = ['#F29F05', '#301DF2', '#1DF281']; // Colors

const wantedGraphicData = [{ x: 'Despesa', y: 35 }, { x: 'Investimentos', y: 90 }, { x: 'Receita', y: 55 }];

const defaultGraphicData = [{ x: 'Despesa', y: 0 }, { x: 'Investimentos', y: 0 }, { x: 'Receita', y: 100 }]; // Data used to make the animate prop work

const ContainerView = styled.View`
  flex: 1;
  width: 100%;
`

const StyledView = styled.View`
  background-color: white;
  margin: 5%;
  border-radius: 8px;
`

function PieChartComponent() {
  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  useEffect(() => {
    setGraphicData(wantedGraphicData); // Setting the data that we want to display
  }, []);

  return (
    <ContainerView>
      <StyledView>
        <VictoryPie
          animate={{ easing: 'exp' }}
          data={graphicData}
          height={200}
          colorScale={graphicColor}
          innerRadius={20}
          style={{
                          data: {
                              fillOpacity: 0.9, stroke: "#fff", strokeWidth: 2
                          },
                          labels: {
                              fill: "#212121"
                          }
                      }}
        />
      </StyledView>
    </ContainerView>
  );
}

export default PieChartComponent;