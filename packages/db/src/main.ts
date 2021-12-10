import { JSONFile, Low } from "lowdb";

type Data = {
    posts: string[];
}

const main = async () => {
    const adapter = new JSONFile<Data>('./storage/db.json')
    const db = new Low<Data>(adapter)
    await db.read();

    console.log(db.data)

    db.data
        .posts
        .push('hello again');
    db.write();

    console.log(db.data)

};

main();