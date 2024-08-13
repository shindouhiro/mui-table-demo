import ParamsTable from "./components/Table"

import { FormProvider, useForm } from "react-hook-form"

const App = () => {
  const methods = useForm<any>({
    defaultValues: {
    },
  });

  return (
    <div>

      <form
        noValidate
        autoComplete="off"
      >

        <FormProvider {...methods}>
          <ParamsTable
            name="body.data"
            mode="mock"
            type="json"
          />
        </FormProvider>
      </form>
    </div>
  )
}

export default App
