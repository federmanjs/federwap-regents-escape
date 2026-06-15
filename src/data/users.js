export const AUTH_STORAGE_KEY = "regentsEscapeLogin.v1";

export const USERS = [
  {
    displayName: "Jared Federman",
    username: "jared.federman",
    passwordHash: "904c10dfec007dda6b3c9fc65e14128ffe1636dc7324d5288fb60b3c57d47e5a",
    role: "teacher",
  },
  {
    displayName: "Addison Aubuchon",
    username: "addison.aubuchon",
    passwordHash: "65e1335961c62012cf4225e163ca0da9d49b5aab0b1a77917a0091f42b42dffd",
    role: "student",
  },
  {
    displayName: "Kreg Bishop",
    username: "kreg.bishop",
    passwordHash: "5f11428eb9009b8f4338f5d0b11d0322117d72a0a37b9da435ec7eb646b8bec4",
    role: "student",
  },
  {
    displayName: "Caralynne Cole",
    username: "caralynne.cole",
    passwordHash: "88a88e92263218fb6df903221684ebea2c690ac8000fb037186e1ea44a604e58",
    role: "student",
  },
  {
    displayName: "Adrianna DeYulio",
    username: "adrianna.deyulio",
    passwordHash: "8330d4fbdb4a4972b42fdc691ef6d72dd881b45e712fc57da470195744749fdb",
    role: "student",
  },
  {
    displayName: "Hope Hager",
    username: "hope.hager",
    passwordHash: "468e3d7dc55e9d3b65fdc9cd84c3cbe86788608f201f53e3932e87cc25105562",
    role: "student",
  },
  {
    displayName: "David LaVoie",
    username: "david.lavoie",
    passwordHash: "aa7fcff877392c9e2f240aba20e2a915c2f0cf1c9444c7504597ad9c21116589",
    role: "student",
  },
  {
    displayName: "Vincent Mikkelsen",
    username: "vincent.mikkelsen",
    passwordHash: "71dd2feb8e748e4676870867d30394a7bdd8cae6fa5cfbb75a64ea7be0180108",
    role: "student",
  },
  {
    displayName: "Adrianna Page",
    username: "adrianna.page",
    passwordHash: "f849ba89f9da6c3c03a530623bf1a576969fe01bac2731cd0fcaa060ed107825",
    role: "student",
  },
  {
    displayName: "Dominic Spano",
    username: "dominic.spano",
    passwordHash: "1023ad6fb2c38b375f03cfb219f25bda442094a48b6f3f3d1a2eeba7b9e76aec",
    role: "student",
  },
  {
    displayName: "Kyndall Swick",
    username: "kyndall.swick",
    passwordHash: "df5f6e554528c26eda45d913156a8872df9c43ae3049390dcdc441994dc78b3b",
    role: "student",
  },
  {
    displayName: "Declan Teneyck",
    username: "declan.teneyck",
    passwordHash: "9a0243ae857c634466fe5559fcd78593a06d74c6973c173ca0e9623f90c7a4ba",
    role: "student",
  },
];

export function findUser(username) {
  const normalized = normalizeUsername(username);
  return USERS.find((user) => user.username === normalized) ?? null;
}

export function normalizeUsername(username) {
  return String(username ?? "").trim().toLowerCase();
}
