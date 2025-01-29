'use client' // Error boundaries must be Client Components

import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="w-full rounded-lg border border-red-100 bg-red-50 p-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-sm text-red-600">
          데이터를 불러오는 중 문제가 발생했습니다. :
        </p>
        <div>{errorToTexts(error)}</div>
        <button
          onClick={() => reset()}
          className="rounded-md bg-red-100 px-4 py-2 text-sm text-red-600 hover:bg-red-200"
        >
          다시 시도
        </button>
        <Link
          href="/home"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}

function isError(error: Error): error is Error {
  return error instanceof Error || typeof error === 'object'
}

function errorToTexts(error: Error) {
  if (isError(error)) {
    return (
      <>
        <p className="whitespace-pre-line break-all text-sm text-red-600">
          {error.message}
        </p>
      </>
    )
  }

  return error ?? ''
}
