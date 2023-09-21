import { HandPalm, Play } from "phosphor-react";
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useContext } from "react";
import { Countdown } from "./components/Countdown";
import { NewCycleForm } from "./components/NewCycleForm";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(1, "O intervalo precisa ser de no mínimo 5 min")
    .max(60, "O intervalo precisa ser de no máximo 60 min"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { activeCycle, CreateNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData) {
    CreateNewCycle(data);
    // reset();
  }

  // const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  // const minutesAmount = currentSeconds / 60;

  console.log("activeCycle", activeCycle);

  // const [task, setTask] = useState("");

  // Controlled: Manter em tempo real o estado que o usuário insere numa variável, utilizando o controlled o
  // react deve recalcular toda a interface, isso pode gerarum gargalo caso a aplicação tenha uma interface complexa.
  // onChange, value : Controlled Components;

  //  UnControlled : Busca a informação do valor do input apenas quando precisar (submit form)

  // function resetForm(){

  // }

  // console.log(formState.errors);

  const task = watch("task");
  const isSubmitDisabled = !task;

  // console.log("cycles", cycles);

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
