import axios from "axios";

const getChallengeFn = (
  address: string
): Promise<{ data: { challenge: string } }> =>
  axios.post("/api/challenge", {
    user: address,
  });
