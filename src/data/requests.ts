import { DocumentViewId, OperationFields, Session } from "shirokuma"
import { SCHEMA_IDS } from "./schemas"
import {
  SingularDocumentViewId,
  Book,
  BookCreator,
  Library,
  BookItem,
} from "./document_types"

// TODO: This shouldn't be needed. I've filed a PR with Shirokuma to try
//       and remove it: https://github.com/p2panda/shirokuma/pull/29
function expectSingleId(
  input: DocumentViewId | undefined
): SingularDocumentViewId {
  if (Array.isArray(input)) {
    console.error("Array of document ids", input)
    throw new Error("Received an array when we expect a single document id")
  }

  if (input == undefined) {
    throw new Error(
      "Received an undefined value when we expect a single document id"
    )
  }

  return input
}

export async function createBookCreator(
  session: Session,
  bookCreator: BookCreator
): Promise<SingularDocumentViewId> {
  return expectSingleId(
    await session.create(bookCreator, { schemaId: SCHEMA_IDS.book_creator })
  )
}

export async function createBook(
  session: Session,
  book: Book
): Promise<SingularDocumentViewId> {
  // const fields = new OperationFields()
  // fields.insert("event", "relation", reaction.event)

  return expectSingleId(
    await session.create(book, { schemaId: SCHEMA_IDS.book })
  )
}

export async function createLibrary(
  session: Session,
  library: Library
): Promise<SingularDocumentViewId> {
  return expectSingleId(
    await session.create(library, { schemaId: SCHEMA_IDS.library })
  )
}

export async function updateLibrary(
  session: Session,
  library: Partial<Library>,
  viewId: DocumentViewId
): Promise<SingularDocumentViewId> {
  return expectSingleId(
    await session.update(library, viewId, { schemaId: SCHEMA_IDS.library })
  )
}

export async function createBookItem(
  session: Session,
  bookItem: BookItem
): Promise<SingularDocumentViewId> {
  const fields = new OperationFields()
  fields.insert("book", "relation", bookItem.bookId)
  fields.insert("library", "relation", bookItem.libraryId)

  return expectSingleId(
    await session.create(fields, { schemaId: SCHEMA_IDS.book_item })
  )
}
