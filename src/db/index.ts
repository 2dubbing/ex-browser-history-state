import Dexie, { type EntityTable } from "dexie";

type StepsSchemaType = {
  step: number;
  isCompleted: boolean;
  createdAt: TDateISO;
  updatedAt: TDateISO;
};

export type DexieSchema = Dexie & {
  steps: EntityTable<
    StepsSchemaType,
    "step" // pk
  >;
};

const DATABASE_NAME = "BrowserHistoryDatabase";

const createSchema = () => {
  const db = new Dexie(DATABASE_NAME) as DexieSchema;
  // Schema declaration:
  db.version(1).stores({
    steps: "step, isCompleted, createdAt, updatedAt",
  });

  const res = db.steps
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

const initialDB = async () => {
  try {
    const exists = await Dexie.exists(DATABASE_NAME);
    if (exists) {
      console.log("데이터베이스가 존재");
      const db = new Dexie(DATABASE_NAME) as DexieSchema;
      db.version(1).stores({
        steps: "step, isCompleted, createdAt, updatedAt",
      });
      return db;
    } else {
      console.log("데이터베이스가 존재하지 않으므로 새로 생성");
      return createSchema();
    }
  } catch (error) {
    console.error(
      "Oops, an error occurred when trying to check database existence: ",
      error
    );
    throw error;
  }
};

export type { StepsSchemaType };
export { initialDB };
