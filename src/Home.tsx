import { createContext, useContext, useState } from "react";
import { any } from "zod";

const CyclesContext = createContext({} as any);

function NewCycleForm() {
  const { activeCycle, setActiveCycle } = useContext(CyclesContext);
  return (
    <>
      <h1>NewCycleForm: {activeCycle}</h1>;
      <button
        onClick={() => {
          setActiveCycle(2);
        }}
      >
        Alterar Ciclo Ativo
      </button>
      ;
    </>
  );
}

function Countdown() {
  const { activeCycle } = useContext(CyclesContext);

  return <h1>Countdown: {activeCycle}</h1>;
}

export function Home() {
  const [activeCycle, setActiveCycle] = useState(0);

  return (
    <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
      <div>
        <NewCycleForm />
        <Countdown />
      </div>
    </CyclesContext.Provider>
  );
}
