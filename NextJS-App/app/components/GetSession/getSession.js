import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../../api/auth/[...nextauth]/route';

export default async function GetSession() {
    const session = await getServerSession(authOptions)

  return <div>
    <div>
          Nome: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
    
  </div>
}
