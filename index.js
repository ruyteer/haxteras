// 305234564-1a0f05a4-3e1c-464c-88ec-bf0093232908

const { MercadoPagoConfig, Preference } = require("mercadopago");
const client = new MercadoPagoConfig({
  accessToken:
    "TEST-2348908258126449-041219-4b97b3cbef8459c5def475afe3616243-305234564",
});

const preference = new Preference(client);

async function get() {
  const preferenceData = await preference.get({
    preferenceId: "305234564-9fec6751-cf5e-4380-9fee-01fb9b7f45ac",
  });
  console.log(preferenceData);
}

get();
