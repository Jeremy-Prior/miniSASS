import React, { useEffect, useState } from "react";
import { Img, Text } from "../../components";
import { CircularProgressbar } from "react-circular-progressbar";
import axios from "axios";
import TabbedContent from "../../components/TabbedContent";
import { globalVariables } from "../../utils";
import LinearProgress from '@mui/material/LinearProgress';

interface ObservationDetailsProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  observation_id: string;
  classname: string;
  handleMapClick: (longitude: number, latitude: number) => void;
  siteWithObservations: { site: {}, observations: []};
}

const ObservationDetails: React.FC<ObservationDetailsProps> = ({ 
  setSidebarOpen, 
  classname,
  observation_id,
  handleMapClick, 
  siteWithObservations 
}) => {

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const GET_OBSERVATION = globalVariables.baseUrl + `/monitor/observations/observation-details/${observation_id}/`

  const [loading, setLoading] = useState(true);
  const [observationDetails, setObservationDetails] = useState({});
  const [titleColor, setTitleColor] = useState<string>('');
  const [progressBarColor, setProgressBarColor] = useState<string>('');
  const [renderCrab, setRenderCrab] = useState<string>('');

  const [observations, setObservations] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [siteDetails, setSiteDetails] = useState({});
  const [tabsData, setTabsData] = useState({});

  const updateScoreDisplay = (score) => {
    if (parseFloat(score) < 6) {
      setTitleColor("text-red-600");
      setProgressBarColor("red");
      setRenderCrab(`${globalVariables.staticPath}img_image2_24x30.png`);
    } else {
      setTitleColor("text-green-800");
      setProgressBarColor("green");
      setRenderCrab(`${globalVariables.staticPath}img_image2.png`);
    }
  };

  const fetchObservation = async (observation: any) => {
    try {
      const response = await axios.get(`${GET_OBSERVATION}`);
      
      if (response.status === 200) {
        setLoading(false);
        setObservationDetails(response.data);
        
        setTimeout(() => {
          handleMapClick(response.data.longitude, response.data.latitude);
        }, 1200);

        updateScoreDisplay(response.data.score);

      } else { }
    } catch (error) {
      console.log(error.message)
     }
  };

  useEffect(() => {
    if (observation_id){
      fetchObservation(observation_id)
    }else {

        updateScoreDisplay(siteWithObservations.observations[0].score)
        setObservationDetails(siteWithObservations.observations ?? [])
        setObservations(siteWithObservations.observations ?? [])
        setSiteDetails(siteWithObservations.site ?? {})


        // create tabs based on observations per site
        setTabsData(siteWithObservations.observations.map((observation: any, index: number) => ({
          id: `tab${index + 1}`,
          label: observation.obs_date, // tab name
          content: (
            // Render content for each tab based on observation data This is an example of images per observation
            <div className="flex flex-row gap-2.5 items-start justify-start overflow-auto w-[566px] sm:w-full" style={{ marginTop: '10%' }}>
              {/* iterate images for observation if any */}
              {observation.observationImages.map((imageSrc, index) => (
                <Img
                  key={index}
                  className="h-[152px] md:h-auto object-cover w-[164px]"
                  src={imageSrc}
                  alt={`img_placeholder_${index}`}
                />
                ))
              }
            </div>
          ),
        })))

    }

  }, [observation_id,siteWithObservations]);

  return (
    <div className={classname}
    style={{
        height: '75vh',
        overflowY: 'auto',
        overflowX: 'auto',
      }}
    >
          
    <div className="flex sm:flex-col flex-row gap-2.5 items-start justify-between w-full">
      <div className="flex sm:flex-1 sm:flex-col flex-row gap-3 items-center justify-start w-auto sm:w-full">
        <Text
          className="text-2xl md:text-[22px] text-blue-900 sm:text-xl w-auto"
          size="txtRalewayBold24"
        >
          miniSASS observation details
        </Text>
        <Img
          className="h-6 w-6"
          src={`${globalVariables.staticPath}img_mdidownloadcircleoutline.svg`}
          alt="mdidownloadcirc"
        />
      </div>
      <Img
        className="h-6 w-6"
        src={`${globalVariables.staticPath}img_icbaselineclose.svg`}
        alt="icbaselineclose"
        onClick={handleCloseSidebar}
      />
    </div>

    {loading ? (
        <div style={{
          marginLeft:'10px',
          width: '100%',
          maxWidth: '350px',
        }}><LinearProgress color="success" /></div>
      ) : (
    <>
      <TabbedContent
        tabsData={tabsData}
        activeTabIndex={activeTabIndex}
        onTabChange={(index) => {
          // update variables to reflect changes
          updateScoreDisplay(observations[index].score);
          setObservationDetails(observations[index])
          setActiveTabIndex(index);
        }}
      />
      <div className="flex flex-col gap-6 h-[543px] md:h-auto items-start justify-start w-full">
            <div className="flex flex-row gap-1 items-center justify-start pt-2 w-full">
              <Text
                className={`${titleColor} text-lg w-[140px]`}
                size="txtRalewayBold18"
              >
                Average score:
              </Text>
              <div className="flex flex-row gap-2.5 items-center justify-start w-auto" style={{ marginLeft: '50%' }}>
                <div className="h-[68px] relative w-[68px]">
                  <div className="h-[68px] m-auto w-[68px]">

                    <div
                      className={`!w-[68px] border-solid h-[68px] m-auto overflow-visible bg-${progressBarColor}`}
                    >
                      <CircularProgressbar
                        className={`!w-[68px] border-solid h-[68px] m-auto overflow-visible ${progressBarColor}`}
                        value={parseFloat(observationDetails.score !== undefined && observationDetails.score !== null
                          ? observationDetails.score
                          : (siteWithObservations.observations.length > 0
                            ? siteWithObservations.observations[0].score
                            : '0')) * 10}
                        strokeWidth={3}
                        styles={{
                          trail: { strokeWidth: 3, stroke: "gray" },
                          path: {
                            strokeLinecap: "square",
                            height: "100%",
                            transformOrigin: "center",
                            transform: "rotate(0deg)",
                            stroke: progressBarColor,
                          },
                        }}
                      ></CircularProgressbar>
                    </div>

                    <Img
                      className="absolute h-6 inset-x-[0] mx-auto object-cover top-[19%] w-[45%]"
                      src={renderCrab}
                      alt="rendercrab" />
                  </div>
                  <Text
                    className={`${titleColor} absolute bottom-[18%] inset-x-[0] mx-auto text-base w-max`}
                    size="txtRalewayRomanSemiBold16"
                  >
                    {observationDetails.score !== undefined && observationDetails.score !== null
                    ? observationDetails.score
                    : (siteWithObservations.observations.length > 0
                      ? siteWithObservations.observations[0].score
                      : '0')}
                  </Text>
                </div>
                <Text
                  className={`${titleColor} text-base w-auto`}
                  size="txtRalewayRomanSemiBold16"
                >
                  {progressBarColor === 'green' ? (`Good`) : (`Poor`)}
                </Text>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-start justify-start w-auto sm:w-full">
              <Text
                className="text-blue-900 text-lg w-auto"
                size="txtRalewayBold18Blue900"
              >
                Site Details
              </Text>
              <div className="flex flex-row gap-3 items-center justify-between w-[541px] sm:w-full">
                <Text
                  className="text-gray-800_01 text-lg tracking-[0.15px] w-auto"
                  size="txtRalewayRomanRegular18"
                >
                  River name:
                </Text>
                <Text
                  className="text-gray-800_01 text-lg tracking-[0.15px] w-auto"
                  size="txtRalewayRomanRegular18"
                >
                  {observationDetails.rivername}
                </Text>
              </div>
              <div className="flex flex-row gap-3 items-center justify-between w-[541px] sm:w-full">
                <Text
                  className="text-gray-800_01 text-lg tracking-[0.15px] w-auto"
                  size="txtRalewayRomanRegular18"
                >
                  Site name:
                </Text>
                <Text
                  className="text-gray-800_01 text-lg tracking-[0.15px] w-auto"
                  size="txtRalewayRomanRegular18"
                >
                  {observationDetails.sitename}
                </Text>
              </div>
              <div className="flex sm:flex-col flex-row gap-3 h-[75px] md:h-auto items-start justify-between w-[541px] sm:w-full" style={{ marginTop: '3%' }}>
                <Text
                  className="text-gray-800_01 text-lg tracking-[0.15px] w-auto self-end"
                  size="txtRalewayRomanRegular18"
                >
                  Site description:
                </Text>
                <Text
                  className="leading-[24.00px] max-w-[250px] md:max-w-full text-gray-800_01 text-lg tracking-[0.15px] self-end text-right"
                  size="txtRalewayRomanRegular18"
                >
                  {observationDetails.sitedescription}
                </Text>
              </div>

              <div className="flex flex-row gap-3 items-center justify-between w-[541px] sm:w-full">
                <Text
                  className="text-gray-800_01 text-lg tracking-[0.15px] w-auto"
                  size="txtRalewayRomanRegular18"
                >
                  Latitude:
                </Text>
                <Text
                  className="text-gray-800_01 text-lg tracking-[0.15px] w-auto"
                  size="txtRalewayRomanRegular18"
                >
                  {observationDetails.latitude !== undefined && observationDetails.latitude !== null
                    ? observationDetails.latitude
                    : (siteWithObservations.observations.length > 0
                      ? siteWithObservations.observations[0].latitude
                      : '0')}
                </Text>
              </div>
              <div className="flex flex-row gap-3 items-center justify-between w-[541px] sm:w-full">
                <Text
                  className="text-gray-800_01 text-lg tracking-[0.15px] w-auto"
                  size="txtRalewayRomanRegular18"
                >
                  Longitude:
                </Text>
                <Text
                  className="text-gray-800_01 text-lg tracking-[0.15px] w-auto"
                  size="txtRalewayRomanRegular18"
                >
                  {observationDetails.longitude !== undefined && observationDetails.longitude !== null
                    ? observationDetails.longitude
                    : (siteWithObservations.observations.length > 0
                      ? siteWithObservations.observations[0].longitude
                      : '0')}
                </Text>
              </div>
              <div className="flex flex-row gap-3 items-center justify-between w-[541px] sm:w-full">
                <Text
                  className="text-gray-800_01 text-lg tracking-[0.15px] w-auto"
                  size="txtRalewayRomanRegular18"
                >
                  River category:
                </Text>
                <Text
                  className="text-gray-800_01 text-lg tracking-[0.15px] w-auto"
                  size="txtRalewayRomanRegular18"
                >
                  {observationDetails.rivercategory}
                </Text>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-start justify-start w-auto sm:w-full">
              <Text
                className="text-blue-900 text-lg w-auto"
                size="txtRalewayBold18Blue900"
              >
                Observation details
              </Text>
              <div className="flex flex-row gap-3 items-center justify-between w-[541px] sm:w-full">
                <Text
                  className="text-gray-800_01 text-lg tracking-[0.15px] w-auto"
                  size="txtRalewayRomanRegular18"
                >
                  Date:
                </Text>
                <Text
                  className="text-gray-800_01 text-lg tracking-[0.15px] w-auto"
                  size="txtRalewayRomanRegular18"
                >
                  {observationDetails.obs_date !== undefined && observationDetails.obs_date !== null
                    ? observationDetails.obs_date
                    : (siteWithObservations.observations.length > 0
                      ? siteWithObservations.observations[0].obs_date
                      : 'dd/mm/yyyy')}
                </Text>
              </div>
              <div className="flex flex-row gap-3 items-center justify-between w-[541px] sm:w-full">
                <Text
                  className="text-gray-800_01 text-lg tracking-[0.15px] w-auto"
                  size="txtRalewayRomanRegular18"
                >
                  Collectors name:
                </Text>
                <Text
                  className="text-gray-800_01 text-lg tracking-[0.15px] w-auto"
                  size="txtRalewayRomanRegular18"
                >
                  {observationDetails.collectorsname !== undefined && observationDetails.collectorsname !== null
                    ? observationDetails.collectorsname
                    : (siteWithObservations.observations.length > 0
                      ? siteWithObservations.observations[0].collectorsname
                      : '')}
                </Text>
              </div>
              <div className="flex flex-row gap-3 items-center justify-between w-[541px] sm:w-full">
                <Text
                  className="text-gray-800_01 text-lg tracking-[0.15px] w-auto"
                  size="txtRalewayRomanRegular18"
                >
                  Organisation type:
                </Text>
                <Text
                  className="text-gray-800_01 text-lg tracking-[0.15px] w-auto"
                  size="txtRalewayRomanRegular18"
                >
                  {observationDetails.organisationtype !== undefined && observationDetails.organisationtype !== null
                    ? observationDetails.organisationtype.description
                    : (siteWithObservations.observations.length > 0
                      ? siteWithObservations.observations[0].organisationtype.description
                      : 'N/A')}
                </Text>
              </div>
            </div>
          </div></>
          )}
  </div>
  );
};

export default ObservationDetails;
