import Dexie, { type EntityTable } from "dexie";

type StepsSchemaType = {
  step: number;
  isCompleted: boolean;
  createdAt: TDateISO;
  updatedAt: TDateISO;
};

const DATABASE_NAME = "BrowserHistoryDatabase";

const createDBSchema = async () => {
  const db = new Dexie(DATABASE_NAME) as Dexie & {
    steps: EntityTable<
      StepsSchemaType,
      "step" // pk
    >;
  };
  // Schema declaration:
  db.version(1).stores({
    steps: "step, isCompleted, createdAt, updatedAt",
  });

  const res = await db.steps
    .bulkAdd(
      new Array(4).fill(true).map((_, index) => ({
        step: index,
        isCompleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }))
    )
    .catch((err) => {
      if (err instanceof Dexie.BulkError) {
        console.error("Dexie BulkError: ", err);
        return err;
      }
      console.error("Dexie BulkError 에 잡히지 않은 에러: ", err);
    });

  if (typeof res !== "number") {
    throw new Error("데이터 생성에 실패했습니다.");
  }
  console.log("4건의 데이터가 생성되었습니다.");

  return db;
};

const db = (async () => {
  return Dexie.exists(DATABASE_NAME)
    .then(function (exists) {
      if (exists) {
        console.log("데이터베이스가 존재");
        return new Dexie(DATABASE_NAME);
      } else {
        console.log("데이터베이스가 존재하지 않으므로 새로 생성");
        return createDBSchema();
      }
    })
    .catch(function (error) {
      console.error(
        "Oops, an error occurred when trying to check database existence: ",
        error
      );
      throw new Error(error);
    });
})();

export type { StepsSchemaType };
export { db };
