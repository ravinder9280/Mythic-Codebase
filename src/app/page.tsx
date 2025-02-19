'use client'
import React, { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { aiSummariseCommit } from '~/lib/gemini'

type Props =
 {};

const Home = (props: Props) => {

  return (
    <div>
      <Link href="/page">Go to page 2</Link>
    </div>
  );
};

export default Home;