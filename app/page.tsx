
'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  encodePassphrase,
  generateRoomId,
  randomString,
} from '@/lib/client-utils';
import styles from '../styles/Home.module.css';

export default function Page() {
  const router = useRouter();
  const [e2ee, setE2ee] = useState(false);
  const [sharedPassphrase, setSharedPassphrase] = useState(
    () => randomString(64),
  );

  const startMeeting = () => {
    const roomId = generateRoomId();

    if (e2ee) {
      router.push(
        `/rooms/${roomId}#${encodePassphrase(sharedPassphrase)}`,
      );
    } else {
      router.push(`/rooms/${roomId}`);
    }
  };

  return (
    <main className={styles.main} data-lk-theme="default">
      <div className={styles.tabContent}>
     <div>
      <h1 style={{ margin: 0 }}>Meet Hub</h1>
      <p>
        DDiscover the power of seamless communication with Meet Hub, your ultimate video conferencing solution. Connect with colleagues, friends, and family effortlessly, no matter where you are. Experience crystal-clear audio and high-definition video quality, ensuring every conversation feels personal and engaging. With Meet Hub, collaboration has never been easier or more efficient. Join us today and elevate your virtual meetings to the next level.
      </p>
     </div>
        <p style={{ margin: 0 }}>Try Meet Hub for free.</p>

        <button
          type="button"
          className="lk-button"
          style={{ marginTop: '1rem' }}
          onClick={startMeeting}
        >
          Start Meeting
        </button>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
            }}
          >
            <input
              id="use-e2ee"
              type="checkbox"
              checked={e2ee}
              onChange={(event) => setE2ee(event.target.checked)}
            />

            <label htmlFor="use-e2ee">
              Enable end-to-end encryption
            </label>
          </div>

          {e2ee && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1rem',
              }}
            >
              <label htmlFor="passphrase">Passphrase</label>

              <input
                id="passphrase"
                type="password"
                value={sharedPassphrase}
                onChange={(event) =>
                  setSharedPassphrase(event.target.value)
                }
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
