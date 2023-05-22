import { useState, FC } from "react";
import { Input, Flex, Button, Text } from "@chakra-ui/react";
import getStatistics from "../../api/getStatistics";

type Props = {
  setStatistics: (statistics: string) => void;
};

const DateInput: FC<Props> = ({setStatistics}) => {

  const maxDate = (new Date()).toISOString().split("T")[0];
  const [startDate, setStartDate] = useState<string | undefined>("2023-04-25");
  const [endDate, setEndDate] = useState<string | undefined>(maxDate);

  const generateStatistics = async () => {
    const start = (new Date(startDate||"")).getTime();
    const end = ((new Date(endDate||"")).getTime()+24*3600*1000+10);
    const response = await getStatistics(start,end);
    if (!response) {
      setStatistics("No statistics found")
      return;
    }
    console.log("response", response);
    setStatistics(response);
  };

  return (
    <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
      <Flex justifyContent={"center"} alignItems={"center"} gap="10px" flexDirection={{base:"column", md:"row"}}>
        <Text fontSize={"xl"}>Statisztika generálása</Text>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          width={"fit-content"}
          min="2023-04-25"
          max={maxDate}
          required
        />
        <Text fontSize={"xl"}>és</Text>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          width={"fit-content"}
          min="2023-04-25"
          max={maxDate}
          required
        />
        <Text fontSize={"xl"}>közötti időszakban</Text>
      </Flex>
      <Button alignItems={"center"} justifyContent={"center"} margin={"1rem 0 2rem 0"} onClick={generateStatistics}
      >
        Kérem a statisztikát!
      </Button>
    </Flex>
  );
};

export default DateInput;