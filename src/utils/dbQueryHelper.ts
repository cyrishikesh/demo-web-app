import { get, getDatabase, ref } from "firebase/database";

interface IRevenueObject {
  Country: string;
  Company: string;
  Revenue: [
    {
      month: string;
      value: number;
    }
  ];
}

export const getCompanyList = async (country: string) => {
  const db = getDatabase();
  const db_data_ref = ref(db, "/revenue_db");
  const companySet = new Set<string>();
  const snapshot = await get(db_data_ref);
  const data = snapshot.val();
  data.forEach((element: IRevenueObject) => {
    if (element.Country === country && !companySet.has(element.Company)) {
      companySet.add(element.Company);
    }
  });

  return Array.from(companySet);
};

export const getCountryList = async () => {
  const db = getDatabase();
  const db_data_ref = ref(db, "/revenue_db");
  const countrySet = new Set<string>();
  const snapshot = await get(db_data_ref);
  const data = snapshot.val();
  data.forEach((element: IRevenueObject) => {
    if (!countrySet.has(element.Country)) {
      countrySet.add(element.Country);
    }
  });
  return Array.from(countrySet);
};

export const getCompanyWiseRevenue = async (country: string) => {
  const db = getDatabase();
  const db_data_ref = ref(db, "/revenue_db");
  const snapshot = await get(db_data_ref);
  const data = snapshot.val();
  const res: { label: string[]; value: number[] } = {
    label: [],
    value: [],
  };
  data.forEach((element: IRevenueObject) => {
    if (element.Country === country) {
      const revenue = element.Revenue;
      res.label.push(element.Company);
      let sum = 0;
      revenue.forEach((item) => {
        sum += item.value;
      });
      res.value.push(sum);
    }
  });
  return res;
};

export const getMonthWiseRevenueOfCompany = async (
  country: string,
  company: string
) => {
  const db = getDatabase();
  const db_data_ref = ref(db, "/revenue_db");
  const snapshot = await get(db_data_ref);
  const data = snapshot.val();
  const res: { label: string[]; value: number[] } = {
    label: [],
    value: [],
  };
  data.forEach((element: IRevenueObject) => {
    if (element.Country === country && element.Company === company) {
      const revenue = element.Revenue;
      revenue.forEach((item) => {
        res.label.push(item.month);
        res.value.push(item.value);
      });
    }
  });
  return res;
};
